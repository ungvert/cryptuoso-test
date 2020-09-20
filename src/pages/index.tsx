import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
} from '@material-ui/core';
import Link from 'next/link';

const IndexPage = () => (
  <Container>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h2">
        <MuiLink component={Link} href={`/robots`}>
          Robots list
        </MuiLink>
      </Typography>
    </Box>
  </Container>
);

export default IndexPage;
