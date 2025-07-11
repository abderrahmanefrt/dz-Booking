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