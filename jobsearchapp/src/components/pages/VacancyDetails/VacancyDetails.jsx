import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { SuperJob } from "../../../service/SuperJob";
import { Vacancy } from "../../Vacancy/Vacancy";
import { Error } from "../../Error/Error";

import { Loader, TypographyStylesProvider } from "@mantine/core";

import './VacancyDetails.css';

export const VacancyDetails = () => {

  const {
    getVacancyDetails, 
    vacancyDetails, 
    loadingVacancyDetails, 
    errorVacancyDetails} = SuperJob();
    
  const {id} = useParams();

  useEffect(() => {
    getVacancyDetails(id);
  }, [id]);

  return (
    <>
      {loadingVacancyDetails 
        ? <Loader variant="dots" size="xl"/>
        : errorVacancyDetails ? <Error id={id}/>
          :(
              <div className="details-wrapper">
                <Vacancy {...vacancyDetails}/>
                <TypographyStylesProvider>
                  <div 
                    dangerouslySetInnerHTML={{ __html: `${vacancyDetails.details}` }} 
                    className="details-all"
                  />
                </TypographyStylesProvider>
              </div>
            )
      }
    </>
  )
}