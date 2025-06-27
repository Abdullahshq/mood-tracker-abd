import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMoodsByDate, getMoodsByWeek } from '../features/moods/moodSlice';
import '../styles/App.css';
import { Pie, Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	BarElement,
} from 'chart.js';

// Registering the required components for ChartJS
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	BarElement
);

const emojis = {
	1: '😢',
	2: '😔',
	3: '😐',
	4: '😊',
	5: '🤩',
};

const MoodStatistics = () => {
	const dispatch = useDispatch();
	const { moods } = useSelector((state) => state.moods);
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split('T')[0]
	);
	const [selectedDataOption, setSelectedDataOption] = useState('daily');
	const [chartData, setChartData] = useState({});
	const [chartLabel, setChartLabel] = useState('');

	useEffect(() => {
		if (selectedDataOption === 'daily') {
			dispatch(getMoodsByDate(selectedDate));
			setChartLabel('Daily Mood');
		} else if (selectedDataOption === 'weekly') {
			const currentDate = new Date();
			const startOfWeek = currentDate.getDate() - currentDate.getDay();
			const startDate = new Date(currentDate.setDate(startOfWeek));

			dispatch(
				getMoodsByWeek({
					startDate: startDate.toISOString().split('T')[0],
					endDate: selectedDate,
				})
			);
			setChartLabel('Current Week Mood Trend');
		}
	}, [dispatch, selectedDate, selectedDataOption]);

	useEffect(() => {
		if (selectedDataOption === 'daily') {
			const moodCounts = moods.reduce((acc, mood) => {
				const moodEmoji = emojis[mood.moodValue];
				acc[moodEmoji] = (acc[moodEmoji] || 0) + 1;
				return acc;
			}, {});

			setChartData({
				labels: Object.keys(moodCounts),
				datasets: [
					{
						label: 'Mood Count',
						data: Object.values(moodCounts),
						backgroundColor: [
							'rgba(255, 181, 194, 0.6)',
							'rgba(162, 155, 254, 0.6)',
							'rgba(255, 209, 102, 0.6)',
							'rgba(162, 222, 208, 0.6)',
							'rgba(197, 239, 247, 0.6)',
						],
						borderColor: ['transparent'],
						borderWidth: 1,
					},
				],
			});
		} else if (selectedDataOption === 'weekly') {
			const moodDataByDay = moods.reduce((acc, mood) => {
				const day = new Date(mood.date).getDay();
				if (!acc[day]) {
					acc[day] = { total: 0, count: 0 };
				}
				acc[day].total += mood.moodValue;
				acc[day].count += 1;
				return acc;
			}, {});

			const currentDay = new Date().getDay();
			const averages = [];
			for (let i = 0; i <= currentDay; i++) {
				if (moodDataByDay[i]) {
					averages.push(moodDataByDay[i].total / moodDataByDay[i].count);
				} else {
					averages.push(null); 
				}
			}

			const dayLabels = [
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
			].slice(0, currentDay + 1);

			const backgroundColors = [
				'rgba(255, 181, 194, 0.6)',
				'rgba(162, 155, 254, 0.6)',
				'rgba(255, 209, 102, 0.6)',
				'rgba(162, 222, 208, 0.6)',
				'rgba(197, 239, 247, 0.6)',
			];

			setChartData({
				labels: dayLabels,
				datasets: [
					{
						label: 'Average Mood',
						data: averages,
						backgroundColor: backgroundColors.slice(0, currentDay + 1),
						borderColor: backgroundColors.slice(0, currentDay + 1),
						borderWidth: 1,
					},
				],
			});
		}
	}, [moods, selectedDataOption]);

	return (
		<div className='centered-content'>
			<h2>Mood Statistics</h2>
			<div>
				<label htmlFor='datePicker'>Select Date:</label>
				<input
					type='date'
					id='datePicker'
					value={selectedDate}
					onChange={(e) => setSelectedDate(e.target.value)}
				/>
				<div>
					<label>
						<input
							type='radio'
							name='dataOption'
							value='daily'
							checked={selectedDataOption === 'daily'}
							onChange={() => setSelectedDataOption('daily')}
						/>
						Daily Data
					</label>
					<label>
						<input
							type='radio'
							name='dataOption'
							value='weekly'
							checked={selectedDataOption === 'weekly'}
							onChange={() => setSelectedDataOption('weekly')}
						/>
						Weekly Data
					</label>
				</div>
			</div>
			<div>
				<h3>{chartLabel}</h3>
				{chartData.datasets && chartData.datasets.length > 0 ? (
					selectedDataOption === 'daily' ? (
						<div className='chart-container'>
							<Pie data={chartData} />
						</div>
					) : (
						<div className='line-container'>
							<Bar data={chartData} />
						</div>
					)
				) : (
					<p>No mood data available for this {selectedDataOption} option.</p>
				)}
			</div>
		</div>
	);
};

export default MoodStatistics;
