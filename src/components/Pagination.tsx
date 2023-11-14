/* eslint no-script-url: 0 */
import React, { type ReactText } from 'react';
import omit from 'lodash/omit';

import { addClass, onEnter } from '../helpers';

const noop = () => {};

interface Props {
  className?: string;
  activePage?: number;
  centered?: boolean;
  onClick: (event: React.SyntheticEvent, activePage: number) => void;
  totalPages: number;
}

const Pagination = ({
  activePage = 1,
  totalPages,
  centered,
  onClick,
  ...props
}: Props) => {
  let className = addClass('pagination', props.className);

  // remove unnecessary props
  let myProps = omit(props, [
    'children',
    'onClick',
    'activePage',
    'totalPages',
    'centered',
  ]);

  const pages = Array.from(new Array(Math.ceil(totalPages)), () => undefined);

  const prevEnabled = !(activePage <= 1);
  const nextEnabled = !(activePage >= totalPages);
  const disabledTab = { tabIndex: -1 };

  const onClickBack = (e: React.SyntheticEvent) => onClick(e, activePage - 1);
  const onClickForward = (e: React.SyntheticEvent) =>
    onClick(e, activePage + 1);

  return (
    <ul
      style={centered ? { justifyContent: 'center' } : {}}
      {...myProps}
      className={className}
    >
      <li
        className={`page-item ${prevEnabled ? '' : 'disabled'}`}
        tabIndex={0}
        onClick={!prevEnabled ? noop : onClickBack}
        onKeyPress={!prevEnabled ? noop : onEnter(onClickBack)}
      >
        <a
          href="javascript:void(0);"
          style={{ cursor: 'pointer' }}
          {...(prevEnabled ? {} : disabledTab)}
        >
          {'<'}
        </a>
      </li>
      {pages.map((i, index) => {
        const onPageClick = (e: React.SyntheticEvent) => onClick(e, index + 1);

        return (
          <li
            key={index}
            className={`page-item ${index + 1 === activePage ? 'active' : ''}`}
            tabIndex={0}
            onClick={onPageClick}
            onKeyPress={onEnter(onPageClick)}
          >
            <a href="javascript:void(0);" style={{ cursor: 'pointer' }}>
              {index + 1}
            </a>
          </li>
        );
      })}
      <li
        className={`page-item ${nextEnabled ? '' : 'disabled'}`}
        tabIndex={0}
        onClick={!nextEnabled ? noop : onClickForward}
        onKeyPress={!nextEnabled ? noop : onEnter(onClickForward)}
      >
        <a
          href="javascript:void(0);"
          style={{ cursor: 'pointer' }}
          {...(nextEnabled ? {} : disabledTab)}
        >
          {'>'}
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
