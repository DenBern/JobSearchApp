import { useParams } from "react-router-dom"
import { useEffect, useRef } from "react";
import { SuperJob } from "../../../service/SuperJob";
import { Vacancy } from "../../Vacancy/Vacancy";

import { Loader } from '@mantine/core';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getVacancyDetails, vacancyDetails])
  
  console.log(vacancyDetails)

  return (
    <>
      {/* <Vacancy key={id} {...vacancyDetails}/> */}
      {vacancyDetails 
        ? <div className="vacancy-details" ref={contentRef} /> 
        : <Loader />}
    </>
  )
}