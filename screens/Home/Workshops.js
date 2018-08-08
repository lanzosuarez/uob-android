import React from "react";
import WorkshopItem from "./WorkshopItem";

const Workshops = props => {
  const { workshop_types, workshopId } = props;
  return workshop_types.map(w => (
    <WorkshopItem key={w.type} workshopId={workshopId} workshopType={w} />
  ));
};

export default Workshops;
