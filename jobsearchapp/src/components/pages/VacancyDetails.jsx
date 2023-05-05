import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { SuperJob } from "../../service/SuperJob";
import { Vacancy } from "../Vacancy/Vacancy";

export const VacancyDetails = () => {
  const {getVacancyDetails, vacancyDetails} = SuperJob();
  const {id} = useParams();
  
  useEffect(() => {
    getVacancyDetails(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  console.log(vacancyDetails)
  return (
    <>
      <Vacancy key={id} {...vacancyDetails}/>
      <div dangerouslySetInnerHTML={{ __html: `${vacancyDetails}`}}></div>
    </>
  )
}