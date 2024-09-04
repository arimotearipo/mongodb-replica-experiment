const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const PORT = 3000

// single-node setup
// const mongoURI = 'mongodb://localhost:27017/?replicaSet=rs0';

// three-node setup
const mongoURI = 'mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  readPreference: 'secondaryPreferred',
}).then(() => {
  console.log('Connected to MongoDB replica set');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

const DataSchema = new mongoose.Schema({
  name: String,
  value: String
});

const Data = mongoose.model('Data', DataSchema);

// test connection endpoint
app.get('/test', async (req, res) => {
    const readyState = mongoose.STATES[mongoose.connection.readyState];
    console.log("connection ready state", readyState);
    res.json({connectionState: readyState})
})


// save data endpoint
app.post('/data', async (req, res) => {
  const { name, value } = req.body;

  try {
    const newData = new Data({ name, value });
    await newData.save();
    res.status(201).json({ message: 'Data saved successfully', data: newData });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save data', error: err.message });
  }
});

// delete data endpoint
app.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        if (id === 'all') {
            await Data.deleteMany({})
            res.status(201).json({ message: 'Data deleted successfully', deletedId: id });
        } else {
            await Data.deleteOne({_id: id});
            res.status(201).json({ message: 'All data deleted successfully',});
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete data', error: err.message });
      }
})

// Endpoint to retrieve data from MongoDB
app.get('/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve data', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
