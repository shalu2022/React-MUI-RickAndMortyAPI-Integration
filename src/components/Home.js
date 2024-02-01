import * as React from "react";
import {
  Card,
  Grid,
  CardContent,
  Typography,
  Box,
  CardMedia,
  TextField,
  Container
} from "@mui/material";
import axios from "axios";

function Home() {
    const URL = 'https://rickandmortyapi.com/api/character/';

  const [result, setResult] = React.useState([]);
  const [filterName, setFilterName] = React.useState("")
  const [filterResult, setFilterResult] = React.useState([])

  React.useEffect(() => {
    axios
      .get(URL)
      .then((response) => setResult(response.data.results))
      .catch((error) => console.log("Error fetching data:", error.message));
  }, []);

  React.useEffect(() => {
    const filteredNames = result.filter((name) =>
      name.name.toLowerCase().includes(filterName.toLowerCase())
    );
    setFilterResult(filteredNames);
  }, [result, filterName]);

  return (
    <Container >
      <Grid marginX={2} marginTop={2}>
        <Grid item>
          <TextField
            label="Type Name Here..."
            variant="outlined"
            fullWidth
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 4 }}
        padding={2}
      >
        {filterResult.map((item, index) => {
          return (
            <Grid item key={index} xs={12} sm={6} lg={3}>
              <Card
                sx={{ display: "flex", border: "1px solid lightGray" }}
                xs={12}
                sm={6}
                lg={3}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 151, objectFit: "cover", height: 151 }}
                  image={item.image}
                  alt="Live from space album cover"
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    justifyContent: "flex-start",
                  }}
                >
                  <CardContent>
                    <Typography component="div" variant="16px">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {item.gender}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default Home;
