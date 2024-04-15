// models
import { IUpworkFeedMatchedCase } from '../../../interfaces/matched-case';
import { infoBlockEnum } from '../../../interfaces/info-block-enum';

// utils
import { formatDate } from '../../../utils/format-date';
import { parseInfoBlock } from './utils';

export default function MatchedCase({
  title,
  link,
  content,
  infoBlock,
} : IUpworkFeedMatchedCase) {
  const infoBlockKeyValue = infoBlock && infoBlock.length > 0 ? parseInfoBlock(infoBlock) : [];
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
        {infoBlockKeyValue && infoBlockKeyValue[infoBlockEnum.published] &&
          <div className='info-block'>
            <span className='key'>{infoBlockEnum.published}</span>
            <span className='value'>{formatDate(infoBlockKeyValue[infoBlockEnum.published])}</span>
          </div>
        }
        {infoBlockKeyValue && infoBlockKeyValue[infoBlockEnum.platforms] &&
          <div className='info-block'>
            <span className='key'>{infoBlockEnum.platforms}</span>
            <span className='value'>{infoBlockKeyValue[infoBlockEnum.platforms]};</span>
          </div>
        }
        {infoBlockKeyValue && infoBlockKeyValue[infoBlockEnum.devices] &&
          <div className='info-block'>
            <span className='key'>{infoBlockEnum.devices}</span>
            <span className='value'>{infoBlockKeyValue[infoBlockEnum.devices]};</span>
          </div>
        }
        {infoBlockKeyValue && infoBlockKeyValue[infoBlockEnum['tech stack']] &&
          <div className='info-block'>
            <span className='key'>{infoBlockEnum['tech stack']}</span>
            <span className='value'>{infoBlockKeyValue[infoBlockEnum['tech stack']]};</span>
          </div>
        }
        {infoBlockKeyValue && infoBlockKeyValue[infoBlockEnum['scope of work']] &&
          <div className='info-block'>
            <span className='key'>{infoBlockEnum['scope of work']}</span>
            <span className='value'>{infoBlockKeyValue[infoBlockEnum['scope of work']]}</span>
          </div>
        }
      </div>
    </div>
  );
}
