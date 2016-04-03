class AddDefaultValueToTicketStatus < ActiveRecord::Migration
  def up
    change_column_default :tickets, :state, 0
  end

  def down
    change_column_default :tickets, :state, nil
  end
end
