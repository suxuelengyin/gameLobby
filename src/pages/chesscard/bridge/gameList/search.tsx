import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableCard from '@/components/TableCard';
import router from 'umi/router';
import { Pagination, Spin, Tag } from 'antd';
import Odoo from '@/odoo'
import { connect } from 'dva';
import { PopData, turnData, deleteArrayInArry } from '@/utils';
import { BridgeProps, doing_table_ids, _id } from '..';

const { CheckableTag } = Tag
async function getRound(game_id) {
    const cls = Odoo.env('og.phase');
    const roundArray = await cls.search_read([['game_id', '=', game_id]], { name: null }); console.log(roundArray)
    const round = Array.from(new Set(turnData(roundArray)));
    return round
}
export default (props) => {
    const { loading, changeData, game_id } = props;
    const [round, setRound] = useState([])
    const [check, setCheck] = useState(-1)
    useEffect(() => {
        getRound(game_id).then((value) => {
            setRound(value)
        })
    }, [])
    const updataData = (item, index) => {
        if (!loading) {
            setCheck(index);
            const domain = [['game_id', '=', game_id], ['phase_id', '=', item[0]]];
            changeData(domain);
        }
    }
    return (
        <>
            <div style={{ marginBottom: "12px" }}>
                <span>赛段选择：</span>
                {round.map((item, index) => {
                    return (
                        <CheckableTag
                            key={index}
                            checked={check === index ? true : false}
                            onChange={updataData.bind(this, item, index)}
                        >
                            {item[1]}
                        </CheckableTag>
                    )
                })}
            </div>
        </>
    )
}