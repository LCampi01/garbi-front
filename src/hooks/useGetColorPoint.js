import {
  useCallback 
} from 'react';


const colors = {
  LOW_CAPACITY: '#2E7D32',
  MEDIUM_CAPACITY: '#EF6C00',
  HIGH_CAPACITY: '#D32F2F'
};
  

export const useGetColorPoint = (threshold) => {
  return useCallback((capacity) => {
    const information = getCompanyThresholdInformation(threshold);
    console.log('🚀 ~ returnuseCallback ~ information:', information)

    const matchedInfo = information.find(info =>
      capacity > info.thresholdRange[0] && capacity <= info.thresholdRange[1]
    );

    return matchedInfo ? matchedInfo.color : '#888';
  }, [threshold]); // Solo se actualiza cuando cambia el threshold
};

export function getCompanyThresholdInformation(threshold) {
  return [
    {
      color: colors.LOW_CAPACITY,
      valor: '-' + threshold.warning + '%',
      thresholdRange: [0, threshold.warning]
    },
    {
      color: colors.MEDIUM_CAPACITY,
      valor: threshold.warning + '% - ' + threshold.full + '%',
      thresholdRange: [threshold.warning, threshold.full]
    },
    {
      color: colors.HIGH_CAPACITY,
      valor: '+' + threshold.full + '%',
      thresholdRange: [threshold.full, 100]
    }
  ];
}