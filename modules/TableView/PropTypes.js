import PropTypes from 'prop-types';
export var TABLE_DIRECTION;
(function (TABLE_DIRECTION) {
    TABLE_DIRECTION["ROW"] = "row";
    TABLE_DIRECTION["COLUMN"] = "column";
})(TABLE_DIRECTION || (TABLE_DIRECTION = {}));
export const TableviewPropTypes = {
    title: PropTypes.string,
    tableTitle: PropTypes.object,
    tableDirection: PropTypes.oneOf([TABLE_DIRECTION.ROW, TABLE_DIRECTION.COLUMN]),
    tableData: PropTypes.array,
    border: PropTypes.bool,
    borderColor: PropTypes.string,
    flexArr: PropTypes.arrayOf(PropTypes.number),
};
