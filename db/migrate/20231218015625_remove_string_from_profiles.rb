class RemoveStringFromProfiles < ActiveRecord::Migration[7.1]
  def change
    remove_column :profiles, :string, :string
  end
end
