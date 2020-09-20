/** @jsx jsx */
import { jsx } from '@emotion/core';
import Link from 'next/link';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
  Link as MuiLink,
} from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';

export const ROBOTS_INDEX_QUERY = gql`
  query robots {
    robots(order_by: { code: asc }, limit: 10) {
      id
      code
    }
  }
`;

type RobotIndexItem = {
  id: string;
  code: string;
};

type RobotsIndexData = {
  robots: RobotIndexItem[];
};

const RobotsIndexPage = () => {
  const { loading, error, data } = useQuery<RobotsIndexData, {}>(
    ROBOTS_INDEX_QUERY
  );

  if (error)
    return <Typography color="error">Error loading robots: {error}</Typography>;
  if (loading) return <Typography>Loading</Typography>;

  return (
    <Container>
      <Typography variant="h3">Robots list</Typography>
      <Box>
        {data?.robots.map((robot) => {
          return (
            <Card key={robot.id} variant="outlined">
              <CardContent>
                <Typography>ID {robot.id}</Typography>
                <Typography>Code {robot.code}</Typography>
              </CardContent>

              <CardActions>
                <MuiLink
                  component={Link}
                  href={`/robots/${encodeURIComponent(robot.id)}`}
                >
                  Details
                </MuiLink>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
};

export default RobotsIndexPage;
