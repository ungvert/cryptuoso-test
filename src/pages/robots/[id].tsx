/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Typography } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import flatten from 'lodash/flatten';
import { RobotDetails } from '../components/RobotDetails';

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

  function normalizeSettings(
    settings: RawNormalizedSettingsItem[] | RawNormalizedSettingsItem,
    parentName = ''
  ): NormalizedSettingsItem[] {
    const items = Object.entries(settings).map(([name, value]) => {
      if (typeof value === 'object') {
        return normalizeSettings(value, name);
      } else {
        return {
          name: `${parentName ? parentName + '.' : ''}${name}`,
          value,
        } as NormalizedSettingsItem;
      }
    });

    return flatten(items);
  }

  const normalizedSettings = data?.robot?.settings
    ? normalizeSettings(data?.robot?.settings)
    : [];

  return (
    <RobotDetails
      id={data?.robot.id}
      code={data?.robot.code}
      initialSettings={normalizedSettings}
    />
  );
};

export default RobotsIndexPage;
