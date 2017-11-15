import React from 'react';
import { FormattedMessage } from 'react-intl';
import { concat } from '../util';
import Image from './Image';
import Content from './Content';
import Button from './Button';
import BigDate from './BigDate';
import BigNumber from './BigNumber';
import DepartmentSummary from './DepartmentSummary';
import UserBadge from './UserBadge';
import Address from './Address';
import PageTitle from './PageTitle';
import expandable from '../containers/expandable';

import grid from '../grid.less';
import theme from '../theme.css';
import style from './EventOverview.less';

const DESCRIPTION_LENGTH = 250;

const Description = ({ text }) => {
  const display = text.length <= DESCRIPTION_LENGTH ?
      text :
      text.substring(0, DESCRIPTION_LENGTH)
          .split(' ')
          .slice(0, -1)
          .join(' ');
  return (
    <span className={style.description}>
      {display}
      {display.length < text.length ? (
          <span className={style.more}>
            <FormattedMessage id="event.seeMore" defaultMessage="See More..." />
          </span>)
          : null
      }
    </span>
  );
};

const Info = ({ startDate, endDate, description }) => (
  <div className={concat(style.info, theme.bg_content)}>
    <div className={concat(style.numberSection, theme.divider)}>
      <div>
        <BigDate
            date={startDate}
            label={<FormattedMessage id="date.start" defaultMessage="Start" />}
            className={theme.txt_accent}
        />
        <BigDate
            date={endDate}
            label={<FormattedMessage id="date.end" defaultMessage="End" />}
            className={concat(theme.txt_accent, style.topMargin)}
        />
      </div>
      <div>
        <BigNumber
            label={<FormattedMessage id="role.hours" defaultMessage="Hours Per Role" />}
            infoLines={[
              'Officer Of The Day -',
              'Fire Art Safety Team'
            ]}
            number={20}
            className={theme.txt_accent}
        />
        <BigNumber
            label={<FormattedMessage id="shifts.remaining" defaultMessage="Shifts Remaining" />}
            infoLines={[
              '57 minimum open',
              '132 maximum open'
            ]}
            number={20}
            className={concat(theme.txt_accent, style.topMargin)}
        />
      </div>
    </div>
    <div className={style.descriptionSection}>
      <h3 className={style.title}>
        <FormattedMessage id="event.description" defaultMessage="Description" />
      </h3>
      <Description text={description} />
    </div>
  </div>
);

export default event => (
  <div className={concat(style.wrap, grid.row, theme.page_padding)}>
    <section className={grid.col_sm_4} style={{position: 'relative'}}>
      <PageTitle className={theme.txt_lightest} title={event.name} />
      <Image className={style.eventPhoto} url={event.photo} ratio={1}>
        <UserBadge title={<FormattedMessage id="event.lead" defaultMessage="Event Lead" />}
                   name={event.lead.name}
                   avatar={event.lead.avatar}
                   theme="light"
                   justify="left"
                   className={style.eventLead} />
      </Image>
      <Content><Address address={event.address} /></Content>
      <Button text={<FormattedMessage id="event.edit" defaultMessage="Edit Event" />}
              className={concat(style.button, theme.txt_lightest, theme.bg_3)} />
      <Button text={<FormattedMessage id="event.deactivate" defaultMessage="Deactivate Event" />}
              className={concat(style.button, theme.txt_lightest, theme.bg_2)} />
    </section>
    <section className={grid.col_sm_8}>
      <Info startDate={event.startDate} endDate={event.endDate} description={event.description} />
    </section>
    {event.departments.map((d, i) => {
      const ExpandableSummary = expandable(`eo:${d.name}`, DepartmentSummary);
      return (
        <div key={i} className={grid.col_sm_12}>
          <ExpandableSummary {...d} />
        </div>
      );
    })}
  </div>
)
