import { Paper, Box, Typography, TextField, Button } from '@material-ui/core';
import React, { useState } from 'react';

type Props = {
  settings: NormalizedSettingsItem[];
  setSettings: React.Dispatch<React.SetStateAction<NormalizedSettingsItem[]>>;
};

const SettingsForm = ({ settings, setSettings }: Props) => {
  const [formSettings, setFormSettings] = useState(settings);
  if (!settings) return null;
  return (
    <Paper>
      <Box p={3}>
        <Typography variant="h4">Change settings</Typography>
        {settings.map(({ name, value }, ix) => {
          return (
            <Box key={name}>
              <Box my={2}>
                <TextField
                  label={name}
                  value={value}
                  onChange={(e) => {
                    const newSettings = [...settings];
                    newSettings[ix].value = Number(e.target.value);
                    setFormSettings(newSettings);
                  }}
                  type="number"
                ></TextField>
              </Box>
            </Box>
          );
        })}

        <Box>
          <Button variant="contained" onClick={() => setSettings(formSettings)}>
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SettingsForm;
