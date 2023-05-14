import { useParams } from "react-router-dom"
import { useEffect, useRef } from "react";
import { SuperJob } from "../../../service/SuperJob";

import { Loader } from '@mantine/core';
import { Vacancy } from '../../Vacancy/Vacancy';

import './VacancyDetails.css';

export const VacancyDetails = () => {

  const {getVacancyDetails, vacancyDetails, loadVacancy} = SuperJob();
  const {id} = useParams();
  const contentRef = useRef(null);
  
  useEffect(() => {
    getVacancyDetails(id);
    if (contentRef.current) {
      contentRef.current.innerHTML = `${vacancyDetails}`;
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(vacancyDetails.details)
    

  return (
    <>
      {loadVacancy ? <Loader/> : (
          <div className="details">
            <Vacancy {...vacancyDetails}/>
            <div className="vacancy-details" ref={contentRef}/>
          </div>
        )
      }
    </>
  )
}