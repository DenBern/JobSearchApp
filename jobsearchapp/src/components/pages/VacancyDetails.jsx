import { useParams } from "react-router-dom"
import { SuperJob } from "../../service/SuperJob";
import { useEffect } from "react";

export const VacancyDetails = () => {
  const {id} = useParams();

  const {getVacancyDetails, vacancyDetails} = SuperJob();

  useEffect(() => {
    getVacancyDetails(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <span>{id}</span>
      <p>{vacancyDetails}</p>
    </>
  )
}