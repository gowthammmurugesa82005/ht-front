import React, { useState, useEffect, useCallback } from "react";
import { Container, Table, Button, Form, Row, Col, ProgressBar } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./HabitTracker.css";

// Import ChartJS components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HabitTrackerDashboard = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ name: "", startDate: "", id: null });
  const [todayProgress, setTodayProgress] = useState(false);
  const [weekDays, setWeekDays] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Add or update habit function
  const addOrUpdateHabit = () => {
    if (!newHabit.name || !newHabit.startDate) return alert("Please fill all fields");

    const startDate = new Date(newHabit.startDate);
    const newWeekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date.toLocaleDateString("en-GB");
    });

    const updatedHabit = {
      ...newHabit,
      progress: Array(7).fill(todayProgress ? true : false),
      id: newHabit.id || Date.now(),
    };

    if (newHabit.id) {
      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit.id === newHabit.id
            ? { ...habit, name: newHabit.name, progress: updatedHabit.progress }
            : habit
        )
      );
    } else {
      setHabits((prevHabits) => [...prevHabits, updatedHabit]);
    }

    setWeekDays(newWeekDays);
    setNewHabit({ name: "", startDate: "", id: null });
    setTodayProgress(false);
  };

  // Update habit progress for selected date
  const handleHabitProgressUpdate = (habitIndex, dayIndex) => {
    const updatedHabits = [...habits];
    updatedHabits[habitIndex].progress[dayIndex] = !updatedHabits[habitIndex].progress[dayIndex];
    setHabits(updatedHabits);
  };

  // Handle Calendar Date Change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Calculate habit performance
  const calculatePerformance = (habit) => {
    const total = habit.progress.length;
    const tracked = habit.progress.filter(Boolean).length;
    return Math.round((tracked / total) * 100);
  };

  // Overall performance across all habits (including filtered habits)
  const overallPerformance = () => {
    const habitsToConsider = filteredHabits.length > 0 ? filteredHabits : habits;
    const total = habitsToConsider.reduce((acc, habit) => acc + habit.progress.length, 0);
    const tracked = habitsToConsider.reduce(
      (acc, habit) => acc + habit.progress.filter(Boolean).length,
      0
    );
    return total === 0 ? 0 : Math.round((tracked / total) * 100);
  };

  // Generate chart data (based on filtered habits if any)
  const generateChartData = () => {
    const data = filteredHabits.length > 0 ? filteredHabits : habits;
    return {
      labels: weekDays,
      datasets: [
        {
          label: "Habit Completion %",
          data: weekDays.map((_, i) => {
            const dayCompletion = data.filter((habit) => habit.progress[i]).length;
            return data.length === 0 ? 0 : (dayCompletion / data.length) * 100;
          }),
          backgroundColor: "rgba(255, 193, 7, 0.2)",
          borderColor: "rgba(255, 193, 7, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Filter habits based on date range selected by user
  const handleDateRangeFilter = useCallback(() => {
    if (!selectedStartDate || !selectedEndDate) return alert("Please select a valid date range.");

    const filtered = habits.filter((habit) => {
      const habitStartDate = new Date(habit.startDate);
      return habitStartDate >= new Date(selectedStartDate) && habitStartDate <= new Date(selectedEndDate);
    });
    setFilteredHabits(filtered);
  }, [habits, selectedStartDate, selectedEndDate]);

  // useEffect to update the filtered habits whenever start/end date is changed
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      handleDateRangeFilter();
    }
  }, [selectedStartDate, selectedEndDate, handleDateRangeFilter]);

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={3} className="bg-dark text-light p-3">
          <h4>Habit Tracker</h4>
          <Form>
            <Form.Group className="mt-3">
              <Form.Label>Habit Name</Form.Label>
              <Form.Control
                type="text"
                value={newHabit.name}
                onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={newHabit.startDate}
                onChange={(e) => setNewHabit({ ...newHabit, startDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Today's Progress</Form.Label>
              <Form.Check
                type="checkbox"
                label="Mark habit as done today"
                checked={todayProgress}
                onChange={(e) => setTodayProgress(e.target.checked)}
              />
            </Form.Group>
            <Button
              variant="warning"
              className="w-100 mt-3"
              onClick={addOrUpdateHabit}
            >
              {newHabit.id ? "Update Habit" : "Add Habit"}
            </Button>
          </Form>
        </Col>

        <Col md={9} className="p-3">
          <h4>Dashboard</h4>

          {/* Calendar */}
          <Row className="mt-4">
            <Col md={4}>
              <Calendar
                value={selectedDate}
                onChange={handleDateChange}
                className="calendar-container"
              />
            </Col>

            <Col md={8}>
              <Line data={generateChartData()} />
            </Col>
          </Row>

          {/* Habit Progress Table */}
          <Row className="mt-4">
            <Col md={12}>
              <Table striped bordered hover variant="dark" className="mt-4">
                <thead>
                  <tr>
                    <th>Habit</th>
                    <th>Performance</th>
                    {weekDays.map((day, index) => (
                      <th key={index}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(filteredHabits.length > 0 ? filteredHabits : habits).map(
                    (habit, habitIndex) => (
                      <tr key={habit.id}>
                        <td>{habit.name}</td>
                        <td>{calculatePerformance(habit)}%</td>
                        {habit.progress.map((completed, dayIndex) => (
                          <td
                            key={dayIndex}
                            onClick={() => handleHabitProgressUpdate(habitIndex, dayIndex)}
                            style={{ cursor: "pointer" }}
                          >
                            {completed ? (
                              <span className="text-warning">&#x2714;</span>
                            ) : (
                              <span className="text-secondary">&#x2716;</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>

          {/* Date Range Filter */}
          <Row className="mt-4">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Select Date Range</Form.Label>
                <Row>
                  <Col md={5}>
                    <Form.Control
                      type="date"
                      value={selectedStartDate}
                      onChange={(e) => setSelectedStartDate(e.target.value)}
                    />
                  </Col>
                  <Col md={5}>
                    <Form.Control
                      type="date"
                      value={selectedEndDate}
                      onChange={(e) => setSelectedEndDate(e.target.value)}
                    />
                  </Col>
                  <Col md={2}>
                    <Button variant="info" onClick={handleDateRangeFilter}>Filter</Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

          {/* Performance Overview */}
          <Row className="mt-4">
            <Col md={12}>
              <h5>Your Performance</h5>
              <ProgressBar
                now={overallPerformance()}
                label={`${overallPerformance()}%`}
                className="my-2"
              />
              <p>Overall All-Time Performance</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HabitTrackerDashboard;
