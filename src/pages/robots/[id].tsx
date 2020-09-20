/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Link from 'next/link';
import {
  Box,
  Button,
  Container,
  Typography,
  Link as MuiLink,
  Paper,
  TextField,
} from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import flatten from 'lodash/flatten';

export const ROBOT_DETAILS_QUERY = gql`
  query Robot($id: uuid!) {
    robot: robots_by_pk(id: $id) {
      id
      code
      settings
    }
  }
`;

type Robot = {
  id: string;
  code: string;
  settings: {
    volume: number;
    strategyParameters: {
      adxHigh: number;
      lookback: number;
      adxPeriod: number;
      trailBars: number;
    };
    requiredHistoryMaxBars: number;
  };
};

type RobotDetailsData = {
  robot: Robot;
};

const RobotsIndexPage = () => {
  const { query } = useRouter();
  const id = Array.isArray(query.id) ? query.id[0] : query.id;

  const { loading, error, data } = useQuery<RobotDetailsData, {}>(
    ROBOT_DETAILS_QUERY,
    {
      variables: { id },
    }
  );

  if (error)
    return <Typography color="error">Error loading robot: {error}</Typography>;
  if (loading) return <Typography>Loading</Typography>;

  type RawSettingsItem = Record<string, number | Record<string, number>>;
  type SettingsItem = { name: string; value: number };

  function normalizeSettings(
    settings: RawSettingsItem[] | RawSettingsItem,
    parentName = ''
  ): SettingsItem[] {
    const items = Object.entries(settings).map(([name, value]) => {
      if (typeof value === 'object') {
        return normalizeSettings(value, name);
      } else {
        return {
          name: `${parentName ? parentName + '.' : ''}${name}`,
          value,
        } as SettingsItem;
      }
    });

    return flatten(items);
  }

  const settings = data?.robot?.settings
    ? normalizeSettings(data?.robot?.settings)
    : [];

  return (
    <Container>
      <Typography variant="h2">Robot details</Typography>

      <Box m={3}>
        <Typography variant="h4">Code</Typography>
        <Typography>{data?.robot.code}</Typography>
      </Box>

      <Box m={3}>
        <Typography variant="h4">ID</Typography>
        <Typography>{data?.robot.id}</Typography>
      </Box>
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
        <Paper>
          <Box p={3}>
            <Typography variant="h4">Change settings</Typography>
            {settings.map(({ name, value }) => {
              return (
                <Box key={name}>
                  <Box my={2}>
                    {/* <Typography variant="h5">{name}</Typography> */}
                    <TextField label={name} value={value}>
                      {/* <Typography>{value}</Typography> */}
                    </TextField>
                  </Box>
                </Box>
              );
            })}

            <Box>
              <Button></Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RobotsIndexPage;
