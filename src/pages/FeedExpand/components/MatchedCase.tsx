import React from 'react';

// models
import { IUpworkFeedMatchedCase } from '../../../interfaces/matched-case';

// utils
import { formatDate } from '../../Feed/util';

export default function MatchedCase({
  title,
  link,
  content,
  infoBlock,
} : IUpworkFeedMatchedCase) {
  return (
    <div className='matched-case'>
      <div className='title-link'>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {title}
        </a>
      </div>
      <div className='summary'>
        {content}
      </div>
      <div className='info'>
        {infoBlock && infoBlock.map((el) =>
          el.key.toLowerCase() === 'published' ?
            <div key={el.key} className='info-block'>
              <span className='key'>{el.key}:</span>
              <span className='value'>{formatDate(el.value)}</span>
            </div> :
            <div key={el.key} className='info-block'>
              <span className='key'>{el.key}:</span>
              <span className='value'>{el.value ? `${el.value};` : 'None'}</span>
            </div>
        )}
      </div>
    </div>
  );
}
