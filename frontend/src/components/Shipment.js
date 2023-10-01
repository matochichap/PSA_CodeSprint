import {
  Typography,
  Grid,
  TableCell,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  TableContainer,
  Box,
} from "@mui/material";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { StyledTableCell, StyledTableRow } from "./IncomingShipments";
import { ShipmentsContext } from "../App";

const Shipment = () => {
  const params = useParams();
  const id = +params.id;
  const [shipments] = useContext(ShipmentsContext);

  const shipment = [...shipments.incoming, ...shipments.outgoing].find(
    (s) => s["Ship ID"] === id
  );

  console.log(shipment);

  const columns = [
    "Port of Origin",
    "Port of Destination",
    "Expected Time of Arrival",
    "Weight of Order (tons)",
  ];
  const columnAlignments = {
    "Weight of Order (tons)": "right",
  };

  const { ["Order ID"]: _, ["Orders"]: __, ...shipmentDetails } = shipment;

  return (
    <Grid container rowGap={2} sx={{ px: 32, py: 4 }}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ m: 3 }}
          textAlign="left"
          fontWeight="500"
        >
          {`Shipment #${id}`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ borderRadius: 3, p: 4, mb: 4 }}>
          {Object.entries(shipmentDetails).map(([key, value]) => (
            <Typography key={key} textAlign="left">
              <Box component="span" fontWeight="700">
                {key}
              </Box>
              {`: ${
                key === "Departure Time" || key === "Arrival Time"
                  ? new Date(value).toLocaleString()
                  : value
              }`}
            </Typography>
          ))}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <StyledTableCell key={index} align={columnAlignments[column]}>
                    {column}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {shipment["Orders"] && shipment["Orders"].length !== 0 ? (
                shipment["Orders"].map((shipment, index) => (
                  <StyledTableRow key={index}>
                    <TableCell>{shipment["Port of Origin"]}</TableCell>
                    <TableCell>{shipment["Port of Destination"]}</TableCell>
                    <TableCell>
                      {new Date(
                        shipment["Expected Time of Arrival"]
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {shipment["Weight of Order (tons)"]}
                    </TableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <TableCell colSpan={4} align="center">
                    No orders in this shipment
                  </TableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Shipment;
