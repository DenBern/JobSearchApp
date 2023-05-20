import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { SuperJob } from "../../../service/SuperJob";
import { Vacancy } from "../../Vacancy/Vacancy";

import { TypographyStylesProvider } from "@mantine/core";
import { Loader } from "@mantine/core";

import './VacancyDetails.css';

export const VacancyDetails = () => {

  const {getVacancyDetails, vacancyDetails, loadVacancy} = SuperJob();
  const {id} = useParams();

  useEffect(() => {
    getVacancyDetails(id);
  }, [id]);

  return (
    <>
      {loadVacancy 
        ? <Loader/> 
        : (
            <div className="details-wrapper">
              <Vacancy {...vacancyDetails}/>
              <TypographyStylesProvider>
                {/* <div 
                  dangerouslySetInnerHTML={{ __html: `${vacancyDetails.details}` }} 
                  className="details-all"
                /> */}
              </TypographyStylesProvider>
            </div>
          )
      }
    </>
  )
}