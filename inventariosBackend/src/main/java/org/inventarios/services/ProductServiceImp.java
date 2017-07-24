/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.inventarios.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.inventarios.models.Product;
import org.springframework.stereotype.Service;

/**
 *
 * @author anita
 */
@Service
public class ProductServiceImp implements ProductService{
    
    private final static String INSERT = "INSERT INTO product (name, description, price) VALUES (?,?,?)";
    private final static String UPDATE = "UPDATE product SET name = ?, description = ?, price = ? WHERE id = ?";
    private final static String DELETE = "DELETE FROM product WHERE id = ?";
    private final static String GET_BY_ID = "SELECT *  FROM product WHERE id = ?";
    private final static String GET_ALL = "SELECT *  FROM product";
    
    Connection con;
    PreparedStatement statement;
    
    @Override
    public void insert(Product product) {
        try {
            connect();
            statement = con.prepareStatement(INSERT, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, product.getName());
            statement.setString(2, product.getDescription());
            statement.setInt(3, product.getPrice());
            long id = statement.executeUpdate();
            product.setId(id);            
            closeConnection();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public boolean update(Product product) {        
        try {
            connect();
            statement =  con.prepareStatement(UPDATE);
            statement.setString(1, product.getName());
            statement.setString(2, product.getDescription());
            statement.setInt(3, product.getPrice());
            statement.setLong(4, product.getId());
            int rows = statement.executeUpdate();
            
            closeConnection();                    
            
            return rows > 0;
        } catch (SQLException ex) {
            return false;
        }
    }

    @Override
    public boolean delete(Long id) {
       try {
            connect();
            statement =  con.prepareStatement(DELETE);
            statement.setLong(1, id);
            int rows = statement.executeUpdate();
            
            closeConnection();                    
            
            return rows > 0;
        } catch (SQLException ex) {
            return false;
        }
    }

    @Override
    public Product getById(Long id) {
       Product product = null;
        try {
            connect();
            statement =  con.prepareStatement(GET_BY_ID);
            statement.setLong(1, id);
            
            ResultSet result =  statement.executeQuery();
            
            if(result.next()){
                product = new Product();
                product.setId(result.getLong("id"));
                product.setName(result.getString("name"));
                product.setDescription(result.getString("description"));
                product.setPrice(result.getInt("price"));
            }
            
            
            closeConnection();
        } catch (SQLException ex) {
            Logger.getLogger(ProductServiceImp.class.getName()).log(Level.SEVERE, null, ex);
        }
       return product;
    }

    @Override
    public List<Product> all() {
        List<Product> data = new ArrayList<>();
        
        try {
            connect();
            statement =  con.prepareStatement(GET_ALL);
            ResultSet result =  statement.executeQuery();
            
            while(result.next()){                
                Product product = new Product();
                product.setId(result.getLong("id"));
                product.setName(result.getString("name"));
                product.setDescription(result.getString("description"));
                product.setPrice(result.getInt("price"));
                data.add(product);
            }            
            
            closeConnection();
        } catch (SQLException ex) {
            Logger.getLogger(ProductServiceImp.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return data;
    }
    
    private Connection connect() throws SQLException{
        con = DriverManager.getConnection("jdbc:mysql://localhost:3306/inventario", "root", "root");
        return con;
    }
    
    private void closeConnection() throws SQLException{
        if(statement != null)
            statement.close();
        if(con != null)
            con.close();
        
        statement = null;
        con = null;
    }

    
}
