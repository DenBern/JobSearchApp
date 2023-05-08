import { useParams } from "react-router-dom"
import { useEffect, useRef } from "react";
import { SuperJob } from "../../../service/SuperJob";
import { Vacancy } from "../../Vacancy/Vacancy";

import './VacancyDetails.css'

export const VacancyDetails = () => {
  const {getVacancyDetails, vacancyDetails} = SuperJob();
  const {id} = useParams();
  const contentRef = useRef(null);
  
  useEffect(() => {
    getVacancyDetails(id)
    if (contentRef.current) {
      contentRef.current.innerHTML = vacancyDetails;
    }
  }, [getVacancyDetails, vacancyDetails])
  
  console.log(vacancyDetails)

  return (
    <>
      {/* <Vacancy key={id} {...vacancyDetails}/> */}
      <div ref={contentRef} />
    </>
  )
}