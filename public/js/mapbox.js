export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWFrc2JhYnkiLCJhIjoiY2w1N2Y3MmxuMGY2czNqbnMzbHBhdnZ2eCJ9.w_ijxNuSpG4VzDXbP__CeQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    scrollZoom: false,
  });

  //we want the map to automatically center at the tour location

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    //Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //Add popup
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day} : ${loc.description}</p>`)
      .addTo(map);
    //Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    paddiing: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
