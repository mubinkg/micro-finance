
import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';

export function TooltipItem(props) {
  const { data } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <span>
      <p>{data}</p>
      <Tooltip
        placement={item.placement}
        isOpen={tooltipOpen}
        target={'Tooltip-' + id}
        toggle={toggle}
      >
        Tooltip Content!
      </Tooltip>
    </span>
  );
}