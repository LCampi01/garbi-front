export const formatContainers = (containers) => {
  return containers.map((container) => {
    if (!container.coordinates) {
      return {
        ...container,
        lat: 0,
        lng: 0,
      };
    }
    return {
      ...container,
      lat: container.coordinates.lat,
      lng: container.coordinates.lng,
    };
  });
};