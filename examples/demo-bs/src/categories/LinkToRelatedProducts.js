import React from 'react';
import compose from 'recompose/compose';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { Link } from '@yeutech/react-admin-bs';
import { translate } from '@yeutech/react-admin-bs';
import { stringify } from 'query-string';

import { ProductIcon } from '../products';

const styles = {
    icon: { paddingRight: '0.5em' },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },
};

const LinkToRelatedProducts = ({ classes, record, translate }) => (
    <Button color="primary">
        <Link
            to={{
                pathname: '/products',
                search: stringify({
                    page: 1,
                    perPage: 25,
                    filter: JSON.stringify({ category_id: record.id }),
                }),
            }}
            className={classes.link}
        >
            <ProductIcon className={classes.icon} />
            {translate('resources.categories.fields.products')}
        </Link>
    </Button>
);

const enhance = compose(withStyles(styles), translate);
export default enhance(LinkToRelatedProducts);
