import { useEffect, useContext } from "react";
import { SuperJob } from "../../service/SuperJob";
import { Select } from "@mantine/core";
import { NumberInput } from '@mantine/core';
import { Button } from '@mantine/core';

import { Context } from "../../context";

import './Filters.css';

export const Filters = (props) => {

  const { updateFilters } = props;

  const {
    catalogValue, 
    setCatalogValue, 
    paymentFrom, 
    setPaymentFrom,
    paymentTo,
    setPaymentTo,
    setActiveBtn,
    filtersActive,
    setActiveFilters
  } = useContext(Context);

  const {catalogues, getCatalogues} = SuperJob();

  useEffect(() => {
    getCatalogues();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clearFilters = () => {
    setCatalogValue(null)
    setPaymentFrom(null)
    setPaymentTo(null)
    setActiveFilters(false)
  }

  return (
    <div className="wrapperfilters">
      <div className="filters">
        <div className="title-filters">
          <h3>Фильтры</h3>
          <button
            disabled={(catalogValue || paymentFrom || paymentTo) ? false : true}
            onClick={clearFilters}
            className="reset-all">
            Сбросить все
            <span 
              className="sign">
              &times;
            </span>
          </button>
        </div>
        <div className="wrapper-industry">
          <p>Отрасль</p>
          <Select
            data={
              catalogues.map(catalog => {
                return {
                  value: catalog.key,
                  label: catalog.title_rus,
                }
              })
            }
            placeholder="Выберете отрасль"
            radius="md"
            size="md"
            limit={2}
            value={catalogValue} 
            onChange={setCatalogValue}
          />
        </div>
        <div className="wrapper-salary">
          <p>Оклад</p>
          <NumberInput
            type="number"
            placeholder="От"
            min={0}
            max={paymentTo}
            onChange={value => {
                setPaymentFrom(value)
                setActiveFilters(true)
              }
            }
            step={1000}
            value={paymentFrom ?? ''}
          />
          <NumberInput
            type="number"
            placeholder="До"
            min={paymentFrom}
            onChange={value => setPaymentTo(value)}
            step={1000}
            value={paymentTo ?? ''}
          />
        </div>
        <Button
          disabled={(catalogValue || paymentFrom || paymentTo) ? false : true}
          onClick={() => {
              setActiveFilters(true)
              updateFilters(catalogValue, paymentFrom, paymentTo);
              setActiveBtn(true);
            }
          }>
          Применить
        </Button>
      </div>
    </div>
  )
}