const Flight= require('../models/Flights');

exports.createFlight=async(req, res)=>{
  const { airline, flightnumber, departure, arrival, price ,seatsAvailable }= req.body;
  try {
    const flight= new Flight({
      airline,
      flightnumber,
      departure: {
        city: departure.city,
        date: departure.date
      },
      arrival: {
          city: arrival.city,
        date: arrival.date
      },
      price,
      seatsAvailable
    })
    await flight.save();
    res.status(201).json({ message : 'Flight created successfully', flight})
  
  }catch (error){
    console.error('Error creating flight:',error);
    res.status(500).json({message : 'Internal server error'})
  }
}

exports.getsAllflight=async(req, res)=>{
  try {
    const flights =await Flight.find();
    res.status(200).json(flights)

  }catch (error){
    console.error('Error Fetching flights:',error);
    res.status(500).json({message : 'Internal server error'})
    
  }
}

exports.getFlightsById=async(req, res)=>{
  const flightId = req.params.id;
  try {
    const flight =await Flight.findById(flightId);
    if (!flight){
      return res.status(404).json({message: 'Flight not find'})

    }
    res.status(200).json(flight)
  }catch (error){
    console.error('Error Fetching flight:',error);
    res.status(500).json({message : 'Internal server error'})
  }
}

exports.updateFlight = async(req, res) => {
  const flightId = req.params.id;
  const { airline, flightnumber, departure, arrival, price, seatsAvailable } = req.body;
  
  try {
    const flight = await Flight.findByIdAndUpdate(
      flightId,  // ID du vol à modifier
      { 
        airline,
        flightnumber,
        departure: {
          city: departure.city,
          date: departure.date
        },
        arrival: {
          city: arrival.city,
          date: arrival.date
        },
        price,
        seatsAvailable 
      },
      { new: true }  // Retourne le document mis à jour
    );

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json({ 
      message: 'Flight updated successfully',
      flight 
    });
    
  } catch (error) {
    console.error('Error updating flight:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.deleteFlight= async(req ,res)=>{
  const flightId = req.params.id;
  try{
    const flight =await Flight.findByIdAndDelete(flightId);
        if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.status(200).json({ message: 'Flight deleted successfully'})
  }catch (error){
    console.error('Error deleting:',error);
    res.status(500).json({message:'error deleting flight'});
  }
}




