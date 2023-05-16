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
    page,
    setPage,
    catalogValue, 
    setCatalogValue, 
    paymentFrom, 
    setPaymentFrom,
    paymentTo,
    setPaymentTo,
    setActiveBtn,
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
    setPage(1)
  }

  const applyFilters = () => {
    page !== 1 && setPage(1);
    setActiveFilters(true);
    updateFilters(catalogValue, paymentFrom, paymentTo);
    setActiveBtn(true);
  }

  const isButtonApplyDisabled = catalogValue || paymentFrom || paymentTo;

  return (
    <div className="wrapper-filters">
      <div className="filters">
        <div className="title-filters">
          <h3>Фильтры</h3>
          <button
            disabled={!isButtonApplyDisabled}
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
            placeholder="Выберите отрасль"
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
            onChange={value => setPaymentFrom(value)}
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
          disabled={!isButtonApplyDisabled}
          onClick={applyFilters}
        >
          Применить
        </Button>
      </div>
    </div>
  )
}