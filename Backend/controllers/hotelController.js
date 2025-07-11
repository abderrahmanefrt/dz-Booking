const Hotel=require('../models/Hotel')

exports.createHotel=async(req, res)=>{
  const { name,location, pricePerNight, roomsAvailable}=req.body;
  try {
    const hotel = new Hotel({
       name,location, pricePerNight, roomsAvailable

    })
    await hotel.save();
    res.status(201).json({message: 'Hotel created successfully', hotel});

  }catch(error){
      console.error('Error creating Hotel:',error);
    res.status(500).json({message : 'Internal server error'})
  }
}

exports.getAllHotels=async(req,res)=>{
  try{
    const hotels=await Hotel.find();
    res.status(200).json(hotels);

  }catch(error){
      console.error('Error fetching flight:',error);
    res.status(500).json({message : 'Internal server error'})
  }
}

exports.getHotelByid =async(req,res)=>{
  const hotelid=req.params.id;
  try{
    const hotel =await Hotel.findById(hotelid);
      if (!hotel){
      return res.status(404).json({message: 'hotel not find'})

    }
    res.status(200).json(hotel);

  }catch(error)
  {
      console.error('Error Fetching hotel:',error);
    res.status(500).json({message : 'Internal server error'})
  }
}

exports.updateHotel=async(req, res)=>{
  const hotelid= req.params.id;
    const { name,location, pricePerNight, roomsAvailable}=req.body;
 try{
  const hotel = await Hotel.findByIdAndUpdate(
    hotelid,
    {name, 
        location, 
        pricePerNight, 
        roomsAvailable}
        , {new: true, runValidators:true})
if (!hotel) {
      return res.status(404).json({ message: 'Hôtel non trouvé' });
    }

    res.status(200).json({ 
      message: 'Hôtel mis à jour avec succès',
      hotel 
    });

  } catch (error) {
    console.error('Erreur mise à jour hôtel:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.deleteHotel = async (req, res) => {
  const hotelId = req.params.id;

  try {
    const hotel = await Hotel.findByIdAndDelete(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hôtel non trouvé' });
    }
    res.status(200).json({ message: 'Hôtel supprimé avec succès' });
  } catch (error) {
    console.error('Erreur suppression hôtel:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
