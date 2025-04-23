
import Temp from "../models/temp.models.js";

const getTempHumidity = async (req, res) => {
    try {
        const { temperature, humidity } = req.body;

        if (temperature === undefined || humidity === undefined) {
            return res.status(400).json({ error: 'Temperature and humidity are required' });
        }

        console.log('Received temperature and humidity:', { temperature, humidity });

        const temp = await Temp.create({ temperature, humidity });
        console.log('Saved temperature and humidity to database:', temp);
        return res.status(200).json({"data":temp });
    } catch (error) {
        console.error('Error getting temperature and humidity:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getData = async (req, res) => {
    try {
        const data = await Temp.find().sort({ createdAt: -1 });
        return res.status(200).json({ data });
    } catch (error) {
        console.error('Error getting temperature and humidity:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export { getTempHumidity, getData }