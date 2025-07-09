import { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    rent: '',
    safety: '',
    transport: '',
    greenery: '',
    nightlife: 'high',
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/match', {
        rent: parseInt(formData.rent),
        safety: parseInt(formData.safety),
        transport: parseInt(formData.transport),
        greenery: parseInt(formData.greenery),
        nightlife: formData.nightlife,
      });
      setResults(res.data);
    } catch (err) {
      console.error("❌ Match failed", err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏙️ Find Your Ideal Neighborhood</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" name="rent" placeholder="Max Rent ₹" onChange={handleChange} className="border p-2 w-full" />
        <input type="number" name="safety" placeholder="Min Safety (1-5)" onChange={handleChange} className="border p-2 w-full" />
        <input type="number" name="transport" placeholder="Min Transport (1-5)" onChange={handleChange} className="border p-2 w-full" />
        <input type="number" name="greenery" placeholder="Min Greenery (1-5)" onChange={handleChange} className="border p-2 w-full" />
        
        <select name="nightlife" onChange={handleChange} className="border p-2 w-full">
          <option value="high">High Nightlife</option>
          <option value="medium">Medium Nightlife</option>
          <option value="low">Low Nightlife</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Search</button>
      </form>

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Top Matches:</h2>
          <ul className="list-disc pl-5 mt-2">
            {results.map((n, i) => (
              <li key={i}>
                {n.name} ({n.city}) — Rent ₹{n.rent}, Safety: {n.safety}, Nightlife: {n.nightlife}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
