const lineSymbol = {
  path: 'M 0,-1 0,1',
  strokeOpacity: 1,
  scale: 4,
};

export const polygonConfig = {
  editable: false,
  strokeOpacity: 0,
  fillOpacity: 0.10,
}

export const polylineConfig ={
  strokeOpacity: 0.5,
  strokeWeight: 3,
  suppressUndo: true,
  icons: [
    {
      icon: lineSymbol,
      offset: '0',
      repeat: '20px',
    },
  ],
}



export const drawAreas = (areas, map) => {
  return areas.map(area => {
    const polygon = new google.maps.Polygon({
      fillColor: area.color,
      paths: area.path,
      ...polygonConfig,
      map: map
    });
    const polyline = new google.maps.Polyline({
      strokeColor: area.color,
      editable: false,
      ...polylineConfig,
      path: area.path,
      map: map,
    });
    return {
      ...area,
      polyline,
      polygon
    }
  })
    
   
}

