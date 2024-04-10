// models
import { IUpworkFeedMatchedBlog } from '../../../interfaces/matched-case';
import { infoBlockEnum } from '../../../interfaces/info-block-enum';

// utils
import { formatDate } from '../../../utils/format-date';
import { parseInfoBlock } from './utils';

export default function MatchedBlog({
  title,
  link,
  infoBlock,
} : IUpworkFeedMatchedBlog) {
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
      <div className='info'>
        {infoBlockKeyValue && infoBlockKeyValue[infoBlockEnum.tags] &&
          <div className='info-block'>
            <span className='key'>{infoBlockEnum.tags}</span>
            <span className='value'>{infoBlockKeyValue[infoBlockEnum.tags].split(', ').map((el) => `#${el}`).join(', ')}</span>
          </div>
        }
        {infoBlockKeyValue && infoBlockKeyValue[infoBlockEnum.categories] &&
          <div className='info-block'>
            <span className='key'>{infoBlockEnum.categories}</span>
            <span className='value'>{infoBlockKeyValue[infoBlockEnum.categories]}</span>
          </div>
        }
        {infoBlockKeyValue && infoBlockKeyValue[infoBlockEnum.published] &&
          <div className='info-block'>
            <span className='key'>{infoBlockEnum.published}</span>
            <span className='value'>{formatDate(infoBlockKeyValue[infoBlockEnum.published], ' ', false, true)}</span>
          </div>
        }
      </div>
    </div>
  );
}
