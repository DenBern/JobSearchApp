import { useEffect, useState } from "react";
import { SuperJob } from "../../service/SuperJob";
import { Select } from "@mantine/core";
import { NumberInput } from '@mantine/core';
import { Button } from '@mantine/core';

import './Filters.css';

export const Filters = (props) => {

  const { updateFilters } = props;

  const [catalogValue, setCatalogValue] = useState(null);
  const [paymentFrom, setPaymentFrom] = useState(null);
  const [paymentTo, setPaymentTo] = useState(null);

  const {catalogues, getCatalogues} = SuperJob();

  useEffect(() => {
    getCatalogues()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clearFilters = () => {
    setCatalogValue(null)
    setPaymentFrom(null)
    setPaymentTo(null)
  }

  return (
    <div className="wrapperfilters">
      <div className="filters">
        <div className="title-filters">
          <h3>Фильтры</h3>
          <button
            disabled={(catalogValue || paymentFrom || paymentTo) ? false : true}
            onClick={() => clearFilters()}
            className="reset-all">
            Сбросить все
            <span className="sign">&times;</span>
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
            onChange={value => setPaymentFrom(value)}
            step={1000}
          />
          <NumberInput
            type="number"
            placeholder="До"
            min={paymentFrom}
            onChange={value => setPaymentTo(value)}
            step={1000}
          />
        </div>
        <Button
          disabled={(catalogValue || paymentFrom || paymentTo) ? false : true}
          onClick={() => updateFilters(catalogValue, paymentFrom, paymentTo)}>
          Применить
        </Button>
      </div>
    </div>
  )
}