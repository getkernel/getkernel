/**
 * Pagination component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  const limit = 10;
  const spectrum = Math.min(totalPages, limit);

  const buttons = Array.from({ length: spectrum }, (v, k) => k + 1).map(
    (btnIndex) => ({
      button: true,
      index: btnIndex,
    }),
  );

  if (totalPages > spectrum) {
    buttons.push({
      button: false,
      index: -1,
    });
    buttons.push({
      button: true,
      index: totalPages,
    });
  }

  return (
    <Grid container spacing={3} justify="center">
      <Grid item>
        <ButtonGroup size="small" aria-label="pagination buttons">
          {buttons.map(({ button, index }) => (
            <Button
              key={`pagination-btn-${index}`}
              disabled={button ? index === currentPage : true}
              onClick={() => goToPage(index)}
            >
              {button ? index : '...'}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
};

export default Pagination;
