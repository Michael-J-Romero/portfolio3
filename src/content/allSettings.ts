import allSettingsText from './allSettings.json?raw';

export type AllSettings = {
  [key: string]: any;
};

const allSettings = JSON.parse(allSettingsText) as AllSettings;

export default allSettings;
