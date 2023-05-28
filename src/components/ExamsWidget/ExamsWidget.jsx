import React, { useState } from "react";
import './ExamsWidget.scss'

import { Edit, Person } from "@mui/icons-material";
import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Tooltip } from "@mui/material";
export const WidgetTemp = ({content}) => {
  

  return (
    <div className="container">
      
      
          <div className="Rwidgetb">
          <h1>{content}</h1>
          </div>
     
      
    </div>
  );
};


