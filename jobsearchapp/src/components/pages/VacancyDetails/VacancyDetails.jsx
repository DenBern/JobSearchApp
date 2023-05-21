import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { SuperJob } from "../../../service/SuperJob";
import { Vacancy } from "../../Vacancy/Vacancy";
import { SkeletonVacancy } from "../../Skeleton/Skeleton";

import { TypographyStylesProvider } from "@mantine/core";

import './VacancyDetails.css';

export const VacancyDetails = () => {

  const {getVacancyDetails, vacancyDetails, loadVacancy} = SuperJob();
  const {id} = useParams();
  // const {addToFavorite, deleteFromFavorite} = useContext(Context);

  useEffect(() => {
    getVacancyDetails(id);
  }, [id]);

  return (
    <>
      {loadVacancy 
        ? <SkeletonVacancy/>
        : (
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