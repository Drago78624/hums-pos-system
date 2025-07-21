import { supabase } from "../lib/supabase";

/**
 * Creates an order
 * @param {Object} order - The order object
 * @returns {Promise<Object>} The created order
 */
export const createOrder = async (order) => {
    const { data,error } = await supabase.from("orders").insert(order).select().single();
    
    if (error) {
        throw error;
    }

    return data; 
};

export const getOrders = async () => {

};

export const getOrder = async (id) => {
  
};

export const createOrderItems = async (orderItems) => {
    const { data, error } = await supabase.from("order_items").insert(orderItems);

    if (error) {
        throw error;
    }

    return data;
};

export const getOrderItems = async () => {

};