const Workout = require('../models/Workout')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find().sort({createdAt: -1})
    res.status(200).json(workouts) 
}

//get single workout

const getWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Cannot find workout"})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(workout)
}

//create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body
    try{
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}


//delete workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params; // Use "id" instead of "_id" to match the route parameter.
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No workout found" });
    }
  
    try {
      const workout = await Workout.findOneAndDelete({ _id: id });
  
      if (!workout) {
        return res.status(404).json({ error: "No workout found" });
      }
  
      res.status(200).json(workout);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" }); // Handle internal server errors gracefully.
    }
  }

//update a workout

const updateWorkout = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No workout found" })
    }
  
    try {
      const workout = await Workout.findOneAndUpdate({ _id: id }, req.body, { new: true })
  
      if (!workout) {
        return res.status(404).json({ error: "No workout found" })
      }
  
      res.status(200).json(workout);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" })
    }
  }

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
}