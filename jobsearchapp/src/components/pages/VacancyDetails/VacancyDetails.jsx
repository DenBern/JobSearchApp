import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { SuperJob } from "../../../service/SuperJob";

import { TypographyStylesProvider } from '@mantine/core';

import { Loader } from '@mantine/core';
import { Vacancy } from '../../Vacancy/Vacancy';

import './VacancyDetails.css';

export const VacancyDetails = () => {


  const {getVacancyDetails, vacancyDetails, loadVacancy} = SuperJob();
  const {id} = useParams();
  // const contentRef = useRef(null);

  useEffect(() => {
    getVacancyDetails(id);
    // if (contentRef.current) {
    //   contentRef.current.innerHTML = `${vacancyDetails.details}`;
    // }
  }, [id]);

  return (
    <>
      {loadVacancy ? <Loader/> : (
          <div className="details-wrapper">
            <Vacancy {...vacancyDetails}/>
            {/* <div className="vacancy-details" ref={contentRef}/> */}
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