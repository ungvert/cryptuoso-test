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
import { useState } from 'react';
import { Pagination } from '@material-ui/lab';

export const ROBOTS_INDEX_QUERY = gql`
  query robots {
    robots(order_by: { code: asc }) {
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
const rowsPerPage = 10;

const RobotsIndexPage = () => {
  const { loading, error, data } = useQuery<RobotsIndexData, {}>(
    ROBOTS_INDEX_QUERY
  );

  const [page, setPage] = useState(1);

  if (error)
    return <Typography color="error">Error loading robots: {error}</Typography>;
  if (loading) return <Typography>Loading</Typography>;

  const totalPages = data?.robots.length
    ? Math.ceil(data?.robots.length / 10)
    : 1;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container>
      <Typography variant="h3">Robots list</Typography>
      <Box>
        {data?.robots
          .slice(
            (page - 1) * rowsPerPage,
            (page - 1) * rowsPerPage + rowsPerPage
          )
          .map((robot) => {
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
      <Box my={4}>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Box>
    </Container>
  );
};

export default RobotsIndexPage;
