import { Container, Typography, Box, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import SettingsForm from './SettingsForm';
type Props = {
  id: string | undefined;
  code: string | undefined;
  initialSettings: NormalizedSettingsItem[];
};
const RobotDetails = ({ id, code, initialSettings }: Props) => {
  const [settings, setSettings] = useState<NormalizedSettingsItem[]>(
    initialSettings
  );

  if (!initialSettings) return null;
  return (
    <Container>
      <Typography variant="h2">Robot details</Typography>

      <Box m={3}>
        <Typography variant="h4">Code</Typography>
        <Typography>{code}</Typography>
      </Box>

      <Box m={3}>
        <Typography variant="h4">ID</Typography>
        <Typography>{id}</Typography>
      </Box>

      <Box display="flex">
        <Box my={3}>
          <Paper>
            <Box p={3}>
              <Typography variant="h4">Settings</Typography>
              {settings.map(({ name, value }) => {
                return (
                  <Box key={name}>
                    <Box my={2}>
                      <Typography variant="h5">{name}</Typography>
                      <Typography>{value}</Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Box>

        <Box my={3}>
          <SettingsForm settings={settings} setSettings={setSettings} />
        </Box>
      </Box>
    </Container>
  );
};

export default RobotDetails;
