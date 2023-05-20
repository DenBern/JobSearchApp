import { useEffect, useContext } from "react";
import { SuperJob } from "../../service/SuperJob";
import { Select } from "@mantine/core";
import { NumberInput } from '@mantine/core';
import { Button } from '@mantine/core';

import { Context } from "../../Context";

import './Filters.css';

export const Filters = (props) => {

  const { setPage, setPaginationPage, setSearchParams } = props;

  const {
    catalogValue, 
    setCatalogValue,
    paymentFrom, 
    setPaymentFrom,
    paymentTo,
    setPaymentTo,
    setActiveFilters
  } = useContext(Context);

  const {catalogues, getCatalogues} = SuperJob();

  useEffect(() => {
    getCatalogues();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeFilter = (value, type) => {
    setActiveFilters(false);
    switch (type) {
        case 'catalog': 
            setCatalogValue(value);
            break;
        case 'from':
            setPaymentFrom(value);
            break;
        case 'to': 
            setPaymentTo(value);
            break;
        default: 
            break;
    }
  }

  const clearFilters = () => {
    setCatalogValue(null);
    setPaymentFrom(null);
    setPaymentTo(null);
    setActiveFilters(false);
    setPage(0);
    setPaginationPage(1);
    setSearchParams(`page=${1}`);
  }

  const applyFilters = () => {
    setPaginationPage(1);
    setSearchParams(`page=${1}`);
    setActiveFilters(true);
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
            onChange={(value) => changeFilter(value, 'catalog')}
          />
        </div>
        <div className="wrapper-salary">
          <p>Оклад</p>
          <NumberInput
            type="number"
            placeholder="От"
            min={0}
            max={paymentTo}
            onChange={(value) => changeFilter(value, 'from')}
            step={1000}
            value={paymentFrom ?? ''}
          />
          <NumberInput
            type="number"
            placeholder="До"
            min={paymentFrom}
            onChange={(value) => changeFilter(value, 'to')}
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