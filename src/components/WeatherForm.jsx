function WeatherForm({
    city,
    temperature,
    humidity,
    onChangeCity,
    onChangeTemperature,
    onChangeHumidity,
    onSubmit,
  }) {
    return (
      <form onSubmit={onSubmit}>
        <label className="block mb-2">
          City:
          <input type="text" value={city} onChange={onChangeCity} />
        </label>
        <label className="block mb-2">
          Temperature:
          <input
            type="number"
            value={temperature}
            onChange={onChangeTemperature}
          />
        </label>
        <label className="block mb-2">
          Humidity:
          <input type="number" value={humidity} onChange={onChangeHumidity} />
        </label>
        <button type="submit">Create Weather Entry</button>
      </form>
    );
  }
  
  export default WeatherForm;